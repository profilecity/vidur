import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { differenceInDays, startOfDay } from 'date-fns';

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

export function timeAgo(date: Date) {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return `${interval}y ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval}mo ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval}d ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval}h ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval}m ago`;
  }
  return `Just Now`;
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

export function expiresIn(date: Date): string {
  const expiryDate = startOfDay(date);
  const today = startOfDay(new Date());
  const daysLeft = differenceInDays(expiryDate, today);
  if (daysLeft === 0) return 'Expires today';
  if (daysLeft === 1) return 'Expires tomorrow';
  if (daysLeft <= 2) return `Expires in ${daysLeft} days`;
  return '';
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
