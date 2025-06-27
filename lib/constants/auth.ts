// TSA Auth Configuration Constants
export const AUTH_CONFIG = {
  EMAIL: {
    FROM: 'team@texassportsacademy.com',
    FROM_NAME: 'Texas Sports Academy',
    REPLY_TO: 'team@texassportsacademy.com',
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