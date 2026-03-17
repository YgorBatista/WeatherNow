'use client';

import { useSearchParams } from 'next/navigation';

import NextFiveDays from './components/NextFiveDays';
import { Weather } from './components/Weather';
import { useMemo, useEffect, useState } from 'react';
import Holiday from './components/Holiday';
import { Modal } from './components/Modal';

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
        <div className="flex-1 flex bg-[#F5F5F5]  dark:bg-neutral-900 flex-col items-center justify-center overflow-hidden  ">
            <div className="lg:flex lg:justify-evenly  lg:items-center  w-[95vw] max-w-[1500px] ">
                <Weather />
                {coords ? <NextFiveDays lat={coords.lat} lon={coords.lon} /> : <div className="">Selecione uma cidade para ver a previsão.</div>}
            </div>

            <Holiday />
            <Modal />
        </div>
    );
}
