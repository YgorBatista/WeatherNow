'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Welcome() {
    const router = useRouter();
    return (
        <main className=" flex-1 bg-[#F5F5F5]  dark:bg-neutral-900 flex items-center justify-center px-6 ">
            <div className=" bg-white dark:bg-neutral-800 w-full h-80 max-w-4xl p-12 rounded-xl shadow-lg text-center relative overflow-hidden">
                {/* Fundo decorativo (simples e leve) */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" className="w-full h-full">
                        <path d="M0 300 C150 200 350 400 500 250 C650 100 800 300 800 300" stroke="#888" strokeWidth="1" fill="none" />
                    </svg>
                </div>

                {/* Conteúdo principal */}
                <div className="relative z-10 ">
                    <h1 className="text-3xl sm:text-5xl font-bold  text-gray-800 dark:text-neutral-100 ">WeatherNow</h1>

                    <p className="text-sm text-gray-600  dark:text-neutral-200 mt-1 ">Seu clima, de forma simples e direta</p>
                    <p className="text-gray-500 dark:text-neutral-300 mt-6 max-w-xl mx-auto text-xs sm:text-sm">
                        Veja a temperatura atual da sua cidade, condições do céu, alerta de chuvas, horários de nascer e pôr do sol, e muito mais.
                    </p>

                    <Button onClick={() => router.push('/local')} className="rounded-3xl p-6 mt-8">
                        Avançar
                    </Button>
                </div>
            </div>
        </main>
    );
}
