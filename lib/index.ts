/**
 * Main export file for the lib directory
 * Provides a centralized import point for common utilities
 */

// API Exports
export * from './api/invitation-api';
export * from './api/graphql-client';

// Email Service Exports
export { default as EmailService } from './email/email-service';

// Utils Exports
export * from './utils/academic-year';
export * from './utils/map';
