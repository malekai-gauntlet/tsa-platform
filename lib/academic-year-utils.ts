/**
 * Utility functions for handling academic year calculations and formatting
 */

/**
 * Gets the next academic year based on the current date
 * Academic years are formatted as "YYYY-YYYY" (e.g., "2023-2024")
 *
 * @returns The next academic year as a string
 */
export function getNextAcademicYear(): string {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-based (0 = January)
  const currentYear = currentDate.getFullYear();

  // If we're in or after July (6), use the next academic year
  // Otherwise, use the current academic year
  const startYear = currentMonth >= 6 ? currentYear : currentYear - 1;
  const endYear = startYear + 1;

  return `${startYear}-${endYear}`;
}

/**
 * Gets the current academic year based on the current date
 *
 * @returns The current academic year as a string
 */
export function getCurrentAcademicYear(): string {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-based (0 = January)
  const currentYear = currentDate.getFullYear();

  // If we're in or after July (6), use the current year as the start
  // Otherwise, use the previous year as the start
  const startYear = currentMonth >= 6 ? currentYear : currentYear - 1;
  const endYear = startYear + 1;

  return `${startYear}-${endYear}`;
}

/**
 * Gets a list of upcoming academic years
 *
 * @param count Number of years to generate (default: 5)
 * @returns Array of academic years as strings
 */
export function getUpcomingAcademicYears(count: number = 5): string[] {
  const currentYear = new Date().getFullYear();
  const years: string[] = [];

  for (let i = 0; i < count; i++) {
    const startYear = currentYear + i;
    const endYear = startYear + 1;
    years.push(`${startYear}-${endYear}`);
  }

  return years;
}

/**
 * Formats an academic year value for display
 *
 * @param academicYear The academic year in "YYYY-YYYY" format
 * @returns Formatted academic year (e.g., "2023-24")
 */
export function formatAcademicYear(academicYear: string): string {
  if (!academicYear || !academicYear.includes('-')) {
    return academicYear;
  }

  const [startYear, endYear] = academicYear.split('-');

  // If properly formatted as YYYY-YYYY, return the shortened version
  if (startYear?.length === 4 && endYear?.length === 4) {
    return `${startYear}-${endYear.slice(2)}`;
  }

  return academicYear;
}
