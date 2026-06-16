'use client';

import fiveDaysAPI from '@/app/services/fiveDaysAPI';
import { useEffect, useState } from 'react';
import SmallIcons from '@/app/icons/SmallIcons';
import { Variants, motion } from 'framer-motion';

type ForecastDay = {
    weekday: string;
    avgTemp: number;
    icon: string;
};

const container: Variants = {
    hidden: { opacity: 1 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 1
        }
    }
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,

            ease: 'backInOut'
        }
    }
};

export default function NextFiveDays({ lat, lon }: { lat: number; lon: number }) {
    const [forecast, setForecast] = useState<ForecastDay[]>([]);
    const [loading, setLoading] = useState(true);

    //
    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const data = await fiveDaysAPI(lat, lon);
                setForecast(data);
            } catch (error) {
                console.error('Erro ao carregar previsão: ', error);
            } finally {
                setLoading(false);
            }
        }

        if (lat && lon) load();
    }, [lat, lon]);

    if (loading) return;

    if (!forecast || forecast.length === 0) {
        return <div className="w-[15vw]">Sem previsão disponível</div>;
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex lg:flex-col lg:h-[60vh] justify-center mt-6 lg:mt-0 gap-1 ss:gap-2 mx-auto  ss:w-[90vw] lg:max-w-[240px] lg:w-[240px] lg:min-w-[200px]"
        >
            {forecast.map((day: ForecastDay, i: number) => (
                <motion.div
                    key={i}
                    variants={item}
                    className="flex flex-col flex-1 hover:bg-neutral-50 items-center justify-center bg-white dark:bg-neutral-800 dark:hover:bg-[#212121] rounded-xl p-2 ss:p-3 lg:p-2 shadow-xl"
                >
                    <p className="text-sm font-medium ">{day.weekday}</p>

                    <div className="animate-scalePulse ">
                        <SmallIcons code={day.icon} />
                    </div>

                    <p className="text-sm font-normal">{day.avgTemp}°C</p>
                </motion.div>
            ))}
        </motion.div>
    );
}
