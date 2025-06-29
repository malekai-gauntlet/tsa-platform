/**
 * Coach Section Error Handling Utilities
 *
 * This file provides error handling utilities used throughout the Coach section.
 * These functions help provide consistent error handling and user feedback.
 */

/**
 * Handles API errors consistently
 * @param error The caught error
 * @param errorSetter Function to set error state
 */
export function handleApiError(error: unknown, errorSetter: (msg: string) => void): void {
  console.error('API Error:', error);

  if (error instanceof Error) {
    errorSetter(error.message);
  } else if (typeof error === 'string') {
    errorSetter(error);
  } else {
    errorSetter('An unexpected error occurred');
  }
}

/**
 * Formats GraphQL errors into a user-friendly message
 * @param errors GraphQL errors array
 * @returns User-friendly error message
 */
export function formatGraphQLErrors(errors: any[]): string {
  if (!errors || !errors.length) {
    return 'An unknown error occurred';
  }

  // Extract message from each error
  const errorMessages = errors.map(err => err.message || 'Unknown error');

  // Return unique error messages
  return Array.from(new Set(errorMessages)).join('. ');
}

/**
 * Checks if an error is a network error
 * @param error The error to check
 * @returns Boolean indicating if it's a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    // Check for common network error messages
    const message = error.message.toLowerCase();
    return (
      message.includes('network') ||
      message.includes('failed to fetch') ||
      message.includes('internet') ||
      message.includes('timeout') ||
      message.includes('abort')
    );
  }
  return false;
}

/**
 * Gets a user-friendly error message based on HTTP status code
 * @param status HTTP status code
 * @returns User-friendly error message
 */
export function getErrorMessageByStatus(status: number): string {
  switch (status) {
    case 400:
      return 'The request was invalid. Please check your input and try again.';
    case 401:
      return 'You are not authorized to perform this action. Please sign in again.';
    case 403:
      return 'You do not have permission to access this resource.';
    case 404:
      return 'The requested resource could not be found.';
    case 408:
      return 'The request timed out. Please try again.';
    case 409:
      return 'There was a conflict with the current state of the resource.';
    case 429:
      return 'Too many requests. Please try again later.';
    case 500:
      return 'An internal server error occurred. Please try again later.';
    case 502:
    case 503:
    case 504:
      return 'The service is currently unavailable. Please try again later.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
}

/**
 * Gets a retry strategy recommendation based on error type
 * @param error The error to analyze
 * @returns Object with retry recommendation
 */
export function getRetryStrategy(error: unknown): {
  shouldRetry: boolean;
  retryAfter?: number;
  message: string;
} {
  // Network errors can usually be retried
  if (isNetworkError(error)) {
    return {
      shouldRetry: true,
      retryAfter: 3000, // 3 seconds
      message: 'Connection issue detected. Retrying shortly...',
    };
  }

  // Parse HTTP errors
  if (error instanceof Error && 'status' in error) {
    const status = (error as any).status;

    // Don't retry client errors (except timeout)
    if (status >= 400 && status < 500 && status !== 408) {
      return {
        shouldRetry: false,
        message: getErrorMessageByStatus(status),
      };
    }

    // Retry server errors with exponential backoff
    if (status >= 500) {
      return {
        shouldRetry: true,
        retryAfter: 5000, // 5 seconds
        message: 'Server error occurred. Retrying shortly...',
      };
    }
  }

  // Default: don't retry unknown errors
  return {
    shouldRetry: false,
    message: 'An error occurred that cannot be automatically retried.',
  };
}
