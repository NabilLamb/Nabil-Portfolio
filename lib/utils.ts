// lib\utils.ts

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidImageSrc(src: unknown): src is string {
  if (typeof src !== "string" || src.trim().length === 0) return false;
  // Local path (must start with /)
  if (src.startsWith("/")) return true;
  // Absolute URL
  try {
    new URL(src);
    return true;
  } catch {
    return false;
  }
}
