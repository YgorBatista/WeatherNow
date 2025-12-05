'use client';

import ThemeBtn from '@/components/ui/ThemeBtn';

const Header = () => {
    return (
        <div className="bg-neutral-400 dark:bg-neutral-800 py-2 px-4 flex justify-between items-center ">
            <h1 className="font-bold text-xl text-white ">WeatherNow</h1>
            <ThemeBtn />
        </div>
    );
};

export default Header;
