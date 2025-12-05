'use client';

import { Sun, Moon, CloudSun, CloudMoon, Cloud, CloudRain, CloudLightning, CloudSnow, CloudFog } from 'lucide-react';
import { JSX } from 'react';

export const weatherIconMap: Record<string, JSX.Element> = {
    '01d': <Sun size={200} strokeWidth={0.6} />,
    '01n': <Moon size={200} strokeWidth={0.6} />,

    '02d': <CloudSun size={200} strokeWidth={0.6} />,
    '02n': <CloudMoon size={200} strokeWidth={0.6} />,

    '03d': <Cloud size={200} strokeWidth={0.6} />,
    '03n': <Cloud size={200} strokeWidth={0.6} />,

    '04d': <Cloud size={200} strokeWidth={0.6} />,
    '04n': <Cloud size={200} strokeWidth={0.6} />,

    '09d': <CloudRain size={200} strokeWidth={0.6} />,
    '09n': <CloudRain size={200} strokeWidth={0.6} />,

    '10d': <CloudRain size={200} strokeWidth={0.6} />,
    '10n': <CloudRain size={200} strokeWidth={0.6} />,

    '11d': <CloudLightning size={200} strokeWidth={0.6} />,
    '11n': <CloudLightning size={200} strokeWidth={0.6} />,

    '13d': <CloudSnow size={200} strokeWidth={0.6} />,
    '13n': <CloudSnow size={200} strokeWidth={0.6} />,

    '50d': <CloudFog size={200} strokeWidth={0.6} />,
    '50n': <CloudFog size={200} strokeWidth={0.6} />
};
