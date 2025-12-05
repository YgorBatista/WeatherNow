'use client';

import { weatherIconMap } from '@/app/icons/TempIcons';
import React from 'react';

export default function SmallIcons({ code }: { code: string }) {
    const icon = weatherIconMap[code];
    if (!icon) return null;

    return React.cloneElement(icon, { size: 40, strokeWidth: 1 });
}
