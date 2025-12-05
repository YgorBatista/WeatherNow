'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Local from '@/app/hooks/local';

type LocationSuggestion = {
    name: string;
    fullName: string;
    lat: number;
    lon: number;
    country: string;
    state: string;
};

export default function Page() {
    const { inputRef, query, setQuery, handleInputChange, suggestions, selectedLocation, isLoading, handleSelectLocation, SearchCity } = Local();

    return (
        <main className="flex-1 min-h-[90vh] bg-[#F5F5F5] dark:bg-neutral-900 flex items-center justify-center px-6">
            <div className="bg-white dark:bg-neutral-800  w-full max-w-4xl p-12 rounded-xl shadow-lg text-center relative">
                {/* conteúdo */}
                <div className="relative z-10">
                    <h1 className="text-5xl font-bold text-gray-800  dark:text-neutral-100">Localização</h1>

                    <p className="text-lg text-gray-600 dark:text-neutral-200  mt-2">informe sua localização</p>

                    <div className="relative mt-6 mx-auto max-w-md z-50">
                        <Input
                            ref={inputRef}
                            type="text"
                            placeholder="Digite sua cidade"
                            value={query}
                            onChange={e => handleInputChange(e.target.value)}
                            disabled={isLoading}
                            className="relative z-50 border dark:border-neutral-500 dark:placeholder:text-neutral-400"
                        />

                        {/* Lista de sugestões */}
                        {suggestions.length > 0 && (
                            <ul className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-neutral-900 shadow-lg rounded-lg border dark:border-neutral-700 z-50">
                                {suggestions.map((item, index) => (
                                    <li
                                        key={index}
                                        className="p-3 hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer text-left border-b dark:border-neutral-700 last:border-b-0"
                                        onClick={() => handleSelectLocation(item)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-gray-800 dark:text-white">{item.name}</p>
                                            {item.state && <span className="text-xs font-bold bg-blue-600 text-white px-2 py-1 rounded">{item.state}</span>}
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1">{item.country}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <Button onClick={SearchCity} disabled={!selectedLocation || isLoading} className="rounded-3xl p-6 mt-11">
                        {isLoading ? 'Carregando...' : 'Avançar'}
                    </Button>
                </div>
            </div>
        </main>
    );
}
