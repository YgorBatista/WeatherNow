'use client';

import { getWeatherIcon } from '@/app/icons/TempIcons';
import React from 'react';

export default function SmallIcons({ code }: { code: string }) {
    // Use the helper to get a JSX icon for the requested code and size
    const iconNode = getWeatherIcon(code, 40);
    if (!iconNode) return null;

    // If it's a valid React element, clone to override/add props (strokeWidth)
    if (React.isValidElement(iconNode)) {
        // cast to any to avoid TS complaining about exact prop types of lucide icons
        return React.cloneElement(iconNode as React.ReactElement, { strokeWidth: 1 } as any);
    }

    // Otherwise return as-is
    return <>{iconNode}</>;
}
