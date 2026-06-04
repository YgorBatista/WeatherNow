'use client';
import { Suspense } from 'react';
import Dashboard from '@/app/dashboard/components/Dashboard';

export default function Page() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <Dashboard />
        </Suspense>
    );
}
