import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import NextFiveDays from '@/app/dashboard/components/NextFiveDays';
import { Weather } from '@/app/dashboard/components/Weather';
import Holiday from '@/app/dashboard/components/Holiday';
import { Modal } from '@/app/dashboard/components/Modal';

export default function Dashboard() {
    const searchParams = useSearchParams();

    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    const coords = useMemo(() => {
        if (!lat || !lon) return null;

        const latNum = parseFloat(lat);
        const lonNum = parseFloat(lon);

        if (isNaN(latNum) || isNaN(lonNum)) return null;

        return { lat: latNum, lon: lonNum };
    }, [lat, lon]);

    return (
        <div className="flex-1 flex bg-[#F5F5F5] dark:bg-neutral-900 flex-col items-center justify-center overflow-hidden">
            <div className="lg:flex lg:justify-evenly lg:items-center w-[95vw] max-w-[1500px] mt-2">
                <Weather />
                {coords ? <NextFiveDays lat={coords.lat} lon={coords.lon} /> : <div>Selecione uma cidade para ver a previsão.</div>}
            </div>

            <Holiday />
            <Modal />
        </div>
    );
}
