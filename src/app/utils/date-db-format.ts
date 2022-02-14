import { formatISO } from 'date-fns';

export function dateDbFormat(date = new Date()): string {
  return formatISO(date);
}
