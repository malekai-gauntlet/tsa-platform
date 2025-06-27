// TSA Auth Configuration Constants
export const AUTH_CONFIG = {
  EMAIL: {
    FROM: 'team@texassportsacademy.com',
    FROM_NAME: 'Texas Sports Academy',
    REPLY_TO: 'info@texassportsacademy.com',
  },
  ROUTES: {
    LOGIN: '/login',
    DASHBOARD: '/',
    MAP: '/map',
  },
  USER_ROLES: {
    ADMIN: 'admin',
    COACH: 'coach',
    PARENT: 'parent',
  },
  GROUPS: ['admin', 'coach'],
} as const;

// Auth form validation
export const AUTH_VALIDATION = {
  EMAIL: {
    REQUIRED: 'Email is required',
    INVALID: 'Please enter a valid email address',
  },
  PASSWORD: {
    REQUIRED: 'Password is required',
    MIN_LENGTH: 'Password must be at least 8 characters',
    COMPLEXITY: 'Password must contain uppercase, lowercase, number, and special character',
  },
} as const; 