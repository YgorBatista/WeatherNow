'use client';

import { DropletIcon, Gauge, MapPin, ThermometerIcon, WindIcon, Cloud } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { extractWeatherData } from '@/app/utils/extractWeatherData';
import { WeatherData } from '@/app/types/weatherDataProps';
import { motion } from 'framer-motion';
import { getIconSize, getWeatherIcon } from '@/app/icons/TempIcons';

export function Weather() {
    const searchParams = useSearchParams();
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [mounted, setMounted] = useState(false);
    const size = getIconSize();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const data = extractWeatherData(searchParams);
        setWeatherData(data);
    }, [searchParams, mounted]);

    if (!mounted || !weatherData) {
        return;
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                delay: 1,
                ease: 'backInOut',
                type: 'spring',
                bounce: 0.95, // máximo sem quebrar
                stiffness: 150,
                damping: 13 // vibra muito
            }}
            className="flex flex-col items-center justify-center"
        >
            <div className="bg-white dark:bg-neutral-800 w-full lg:w-[70dvw] my-4 ss:my-0 max-w-[1200px] p-4 ss:p-8 lg:p-12   rounded-xl shadow-lg relative ">
                <div className="flex flex-col justify-center  items-center gap-6">
                    <h1 className="w-auto flex text-md sm:text-xl">
                        <MapPin className="mr-1" color="#888" />
                        {weatherData.name} - {weatherData.country}
                    </h1>

                    {/* Renderizar ícone dinâmico baseado no código do clima */}
                    <div className="flex items-center justify-center animate-scalePulse">{getWeatherIcon(weatherData.icon, size)}</div>

                    <span className="text-7xl font-extralight">{weatherData.temp.toFixed(0)}°C</span>
                    <p className="text-[#888] dark:text-[#dfdfdf] capitalize">{weatherData.description}</p>
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-2 ss:gap-4 mt-8 ">
                    <div className="bg-neutral-100 dark:bg-neutral-600 rounded-xl flex flex-col justify-center items-center py-1 ss:py-4 ">
                        <WindIcon className="mb-3" color="#888" />
                        <span>{weatherData.wind_speed.toFixed(0)} km/h</span>
                        <p className="text-sm">Vento</p>
                    </div>
                    <div className="bg-neutral-100 dark:bg-neutral-600 rounded-xl flex flex-col justify-center items-center py-1 ss:py-4">
                        <DropletIcon className="mb-3" color="#888" />
                        <span>{weatherData.humidity.toFixed(0)}%</span>
                        <p className="text-sm">Umidade</p>
                    </div>
                    <div className="bg-neutral-100 dark:bg-neutral-600 rounded-xl flex flex-col justify-center items-center py-1 ss:py-4">
                        <ThermometerIcon className="mb-3" color="#888" />
                        <span>{weatherData.feels_like.toFixed(0)}°C</span>
                        <p className="text-sm">Sensação Térmica</p>
                    </div>
                    <div className="bg-neutral-100 dark:bg-neutral-600 rounded-xl flex flex-col justify-center items-center py-1 ss:py-4">
                        <Gauge className="mb-3" color="#888" />
                        <span>{weatherData.pressure.toFixed(0)} hPa</span>
                        <p className="text-sm">Pressão</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
