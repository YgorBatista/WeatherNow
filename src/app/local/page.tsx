'use client';

import { Button } from '@/components/ui/button';
import Local from '@/app/hooks/local';
import InputLocal from './InputLocal';

export default function Page() {
    const { inputRef, query, setQuery, handleInputChange, suggestions, selectedLocation, isLoading, handleSelectLocation, SearchCity } = Local();

    return (
        <main className="min-h-[90vh] bg-[#F5F5F5] dark:bg-neutral-900 flex items-center justify-center px-6">
            <div className="bg-white dark:bg-neutral-800 w-full max-w-4xl p-12 rounded-xl shadow-lg text-center relative">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" className="w-full h-full">
                        <path d="M0 300 C150 200 350 400 500 250 C650 100 800 300 800 300" stroke="#888" strokeWidth="1" fill="none" />
                    </svg>
                </div>
                {/* conteúdo */}
                <div className=" relative flex flex-col items-center justify-evenly z-10">
                    <h1 className=" text-3xl sm:text-5xl font-bold text-gray-800  dark:text-neutral-100">Localização</h1>

                    <InputLocal
                        inputRef={inputRef}
                        query={query}
                        handleInputChangeAction={handleInputChange}
                        handleSelectLocationAction={handleSelectLocation}
                        suggestions={suggestions}
                        isLoading={isLoading}
                    />

                    <Button onClick={SearchCity} disabled={!selectedLocation || isLoading} className="rounded-3xl p-6 mt-11">
                        {isLoading ? 'Carregando...' : 'Avançar'}
                    </Button>
                </div>
            </div>
        </main>
    );
}
