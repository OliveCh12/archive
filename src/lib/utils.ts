import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Container utility function for consistent max-width and padding
export function container() {
    return "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
}