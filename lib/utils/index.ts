import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extract display name from email - takes the first part before the dot
 * Examples:
 * - "Danny.mota@email.com" → "Danny"
 * - "john@email.com" → "John"
 * - "sarah.connor@email.com" → "Sarah"
 */
export function extractDisplayNameFromEmail(email: string): string {
  if (!email) return 'Coach';

  const localPart = email.split('@')[0];
  const displayName = localPart.split('.')[0];

  // Capitalize first letter
  return displayName.charAt(0).toUpperCase() + displayName.slice(1).toLowerCase();
}

/**
 * Create school-specific application URL
 * Examples:
 * - "Texas Sports Academy" → "https://www.texassportsacademy.com/texas-sports-academy"
 * - "Elite Basketball Center" → "https://www.texassportsacademy.com/elite-basketball-center"
 */
export function createSchoolApplicationURL(schoolName: string): string {
  if (!schoolName) return 'https://www.texassportsacademy.com/application';

  const schoolSlug = schoolName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-') // Replace multiple dashes with single dash
    .replace(/^-|-$/g, ''); // Remove leading/trailing dashes

  return `https://www.texassportsacademy.com/${schoolSlug}`;
}
