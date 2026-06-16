'use client';

import getNextHoliday from '@/app/services/holidayAPI';
import { HolidayData } from '@/app/types/HolidayDataProps';
import { PartyPopper } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Holiday() {
    const [holiday, setHoliday] = useState<HolidayData | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    // verifica se foi montada a URL para fazer a requisição do proximo feriado
    useEffect(() => {
        setMounted(true);
    }, []);
    useEffect(() => {
        if (!mounted) return;

        async function load() {
            const next = await getNextHoliday();
            setHoliday(next);
            setLoading(false);
        }
        load();
    }, [mounted]);

    if (!mounted || loading) {
        return;
    }

    if (!holiday) {
        return (
            <div className="mt-10 p-4 rounded-xl bg-[#ffffff71] w-[40vw] min-w-[250px] flex flex-col items-center justify-center gap-4 text-sm text-neutral-500 dark:text-neutral-200">
                Nenhum feriado encontrado
            </div>
        );
    }

    const formattedDate = new Date(holiday.date).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5, ease: 'backInOut' }}
            className="mt-10 p-4 rounded-xl bg-[#e0e0e049] dark:bg-[#27272756] w-[40vw]  min-w-[250px]  flex flex-col items-center justify-center  gap-4 text-sm text-neutral-500 dark:text-neutral-200"
        >
            <p>próximo feriado</p>
            <div className="flex flex-col items-center  justify-between gap-2">
                <div className="flex  justify-center text-black text-md font-bold dark:text-white">
                    <PartyPopper strokeWidth={0.8} className="text-neutral-500 " size={20} /> <p className="ml-1 dark:text-white ">{holiday.name}</p>
                </div>
                {holiday.date.replaceAll('-', '/')}
            </div>
            <p> {`falta${holiday.remainingDays <= 1 ? '' : 'm'} ${holiday.remainingDays} dia${holiday.remainingDays <= 1 ? '' : 's'}`}</p>
        </motion.div>
    );
}
