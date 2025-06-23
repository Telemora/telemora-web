import { format, isValid, parseISO } from 'date-fns';

function createSafeDate(dateInput: string | number | Date): Date | null {
  if (!dateInput) return null;

  let date: Date;

  if (typeof dateInput === 'string') {
    date = parseISO(dateInput);
    if (!isValid(date)) {
      date = new Date(dateInput);
    }
  } else {
    date = new Date(dateInput);
  }

  return isValid(date) ? date : null;
}

export function formatSafeDate(
  dateInput: string | number | Date,
  formatString: string = 'PP',
  fallback: string = 'Invalid Date',
): string {
  const date = createSafeDate(dateInput);

  if (!date) return fallback;

  try {
    return format(date, formatString);
  } catch (error) {
    console.warn('Date formatting error:', error);
    return fallback;
  }
}

export const DATE_FORMATS = {
  SHORT: 'PP',
  LONG: 'PPP',
  FULL: 'PPPP',
  TIME: 'p',
  DATETIME: 'PPp',
  ISO: 'yyyy-MM-dd',
} as const;
