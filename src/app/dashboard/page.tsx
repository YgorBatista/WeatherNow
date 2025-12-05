'use client';

import { useSearchParams } from 'next/navigation';

import NextFiveDays from './components/NextFiveDays';
import { Weather } from './components/Weather';
import { useMemo, useEffect, useState } from 'react';
import Holiday from './components/Holiday';

export default function Page() {
    const searchParams = useSearchParams();
    const [mounted, setMounted] = useState(false);

    // Renderizar apenas no client para evitar hidratação mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    const coords = useMemo(() => {
        if (!lat || !lon) return null;
        const latNum = parseFloat(lat);
        const lonNum = parseFloat(lon);
        if (isNaN(latNum) || isNaN(lonNum)) return null;
        return { lat: latNum, lon: lonNum };
    }, [lat, lon]);

    if (!mounted) return null;

    return (
        <div className="flex-1 flex  flex-col items-center justify-center  ">
            <div className="lg:flex lg:justify-evenly transition-all duration-500 lg:items-center  w-[95vw] max-w-[1500px] ">
                <Weather />
                {coords ? <NextFiveDays lat={coords.lat} lon={coords.lon} /> : <div className="w-[15vw]">Selecione uma cidade para ver a previsão.</div>}
            </div>

            <Holiday />
        </div>
    );
}
