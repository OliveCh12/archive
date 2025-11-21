import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Container utility function for consistent max-width and padding
export function container() {
    return "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
}

export interface NameParts {
    firstName: string | null;
    lastName: string | null;
}

export function extractNameParts(name?: string | null): NameParts {
    if (!name) {
        return { firstName: null, lastName: null };
    }

    const segments = name.trim().split(/\s+/).filter(Boolean);

    if (segments.length === 0) {
        return { firstName: null, lastName: null };
    }

    if (segments.length === 1) {
        return { firstName: segments[0], lastName: null };
    }

    const [firstName, ...rest] = segments;
    return { firstName: firstName ?? null, lastName: rest.join(" ") || null };
}