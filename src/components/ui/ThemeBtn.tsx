'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function ThemeSwitch() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="relative group flex items-center justify-center w-10 h-10 rounded-full border-2 dark:border-opacity-35 border-neutral-300 hover:border-neutral-200 dark:border-neutral-600 dark:hover:border-neutral-500 transition-colors bg-transparent"
        >
            <Sun strokeWidth={2.5} className="h-4 w-4 text-neutral-200 opacity-100 scale-110 group-hover:scale-100 transition-all dark:opacity-0 dark:scale-0" />
            <Moon strokeWidth={1.9} className="absolute h-4 w-4  opacity-0 scale-0 transition-all dark:opacity-100 dark:scale-110 dark: group-hover:scale-100" />
        </button>
    );
}
