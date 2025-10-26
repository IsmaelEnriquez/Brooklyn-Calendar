/**
 * Parses a date string in YYYY-MM-DD format and returns a Date object in local timezone.
 * This prevents timezone shift issues where "2025-12-08" might display as Dec 7.
 */
export function parseEventDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  // Month is 0-indexed in JavaScript Date constructor
  return new Date(year, month - 1, day);
}
