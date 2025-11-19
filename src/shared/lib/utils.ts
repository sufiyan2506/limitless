import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes with conditional logic
 * Uses clsx for conditional class names and tailwind-merge to handle conflicts
 * 
 * @param inputs - Class names or conditional class objects
 * @returns Merged class string with conflicts resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}