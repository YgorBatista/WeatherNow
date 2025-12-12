'use client';

import { Sun, Moon, CloudSun, CloudMoon, Cloud, CloudRain, CloudLightning, CloudSnow, CloudFog } from 'lucide-react';
import { ReactNode } from 'react';

export function getIconSize() {
    if (typeof window === 'undefined') return 200; // fallback no SSR
    return window.innerWidth < 400 ? 80 : 200;
}

export function getWeatherIcon(iconCode: string, size: number): ReactNode {
    const iconMap: Record<string, ReactNode> = {
        '01d': <Sun size={size} strokeWidth={0.6} />,
        '01n': <Moon size={size} strokeWidth={0.6} />,

        '02d': <CloudSun size={size} strokeWidth={0.6} />,
        '02n': <CloudMoon size={size} strokeWidth={0.6} />,

        '03d': <Cloud size={size} strokeWidth={0.6} />,
        '03n': <Cloud size={size} strokeWidth={0.6} />,

        '04d': <Cloud size={size} strokeWidth={0.6} />,
        '04n': <Cloud size={size} strokeWidth={0.6} />,

        '09d': <CloudRain size={size} strokeWidth={0.6} />,
        '09n': <CloudRain size={size} strokeWidth={0.6} />,

        '10d': <CloudRain size={size} strokeWidth={0.6} />,
        '10n': <CloudRain size={size} strokeWidth={0.6} />,

        '11d': <CloudLightning size={size} strokeWidth={0.6} />,
        '11n': <CloudLightning size={size} strokeWidth={0.6} />,

        '13d': <CloudSnow size={size} strokeWidth={0.6} />,
        '13n': <CloudSnow size={size} strokeWidth={0.6} />,

        '50d': <CloudFog size={size} strokeWidth={0.6} />,
        '50n': <CloudFog size={size} strokeWidth={0.6} />
    };

    return iconMap[iconCode] ?? <Cloud size={size} strokeWidth={0.6} />;
}
