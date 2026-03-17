'use client';

import { Input } from '@/components/ui/input';
import type { LocationSuggestion } from '@/app/hooks/local';
import { useRouter } from 'next/navigation';

interface InputLocalProps {
    inputRef: React.RefObject<HTMLInputElement | null>;
    query: string;
    handleInputChangeAction: (value: string) => void;
    suggestions: LocationSuggestion[];
    handleSelectLocationAction: (item: LocationSuggestion) => void;
    isLoading: boolean;
}

export default function InputLocal({ inputRef, query, handleInputChangeAction, suggestions, handleSelectLocationAction, isLoading }: InputLocalProps) {
    const router = useRouter();
    return (
        <div className="relative mt-6  w-80 ss:w-96 z-50">
            <Input
                ref={inputRef}
                type="text"
                placeholder="Digite sua cidade"
                value={query}
                onChange={e => handleInputChangeAction(e.target.value)}
                disabled={isLoading}
                className=" z-50  bg-white/35   focus:mb-12 xs:focus:mb-0 border dark:border-neutral-500 dark:placeholder:text-neutral-200"
            />

            {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-neutral-900 shadow-lg rounded-lg border dark:border-neutral-700 z-50">
                    {suggestions.map((item, index) => (
                        <li
                            key={index}
                            className="p-3 hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer text-left border-b dark:border-neutral-700 last:border-b-0"
                            onClick={() => handleSelectLocationAction(item)}
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
    );
}
