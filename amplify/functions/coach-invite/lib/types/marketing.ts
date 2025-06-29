/**
 * Marketing Types
 * Types for marketing-related data and operations
 */

/**
 * Marketing progress data
 * This is stored in the Profile.marketingProgress field in the database
 */
export interface MarketingProgress {
  completedSteps: string[];
  materialsCreated: MarketingMaterial[];
  lastUpdated: string;
}

/**
 * Marketing material data
 * Represents a marketing material created by a coach
 */
export interface MarketingMaterial {
  id: string;
  type:
    | 'flyer'
    | 'brochure'
    | 'social-media'
    | 'email-template'
    | 'website-content'
    | 'presentation'
    | 'poster'
    | 'newsletter'
    | 'business-card'
    | 'event-material';
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  lastModified: string;
  status: 'draft' | 'published' | 'archived';
}

/**
 * Error state for marketing operations
 */
export interface MarketingError {
  code: string;
  message: string;
  operation?: string;
}

/**
 * Response from marketing operations
 */
export interface MarketingResponse<T> {
  success: boolean;
  data?: T;
  error?: MarketingError;
}