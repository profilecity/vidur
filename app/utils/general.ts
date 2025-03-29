import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { differenceInDays, startOfDay, formatDistanceToNow } from 'date-fns';

export const generalColors = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
];

export const sleep = (ms: number) => {
  return new Promise((re, _) => {
    setTimeout(re, ms);
  });
};

export function timeAgo(date: Date): string {
  return formatDistanceToNow(date, {
    addSuffix: true,
  });
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
}

export function getPsuedoRandomColor(inputString: string) {
  return getRandomValueFromArray(inputString, generalColors);
}

export function getRandomValueFromArray<T>(inputString: string, array: T[]) {
  const hash = getHash(inputString);
  const index = Math.abs(hash % array.length);
  return array[index];
}

export function getHash(input: string) {
  let hash = 0;
  if (input.length === 0) return hash;

  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash; // Convert to 32bit integer
  }

  return hash;
}

export function daysFromNow(date: Date): number {
  if (!date) {
    return 0;
  }
  if (date.getTime() < new Date().getTime()) {
    return 0;
  }
  // Set the time to midnight to avoid timezone issues
  // and ensure we are comparing dates only
  // without the time component.
  const expiryDate = startOfDay(date);
  const today = startOfDay(new Date());
  return differenceInDays(expiryDate, today);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
