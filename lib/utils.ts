import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeString(value: string): string {
  return value
    .trim()
    .replace(/<[^>]*>/g, "")
    .replace(/script/gi, "")
    .replace(/javascript:/gi, "");
}

export const RSVP_STORAGE_KEY = "wedding-rsvp-submitted";

export function hasSubmittedRsvp(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(RSVP_STORAGE_KEY) === "true";
}

export function markRsvpSubmitted(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(RSVP_STORAGE_KEY, "true");
}
