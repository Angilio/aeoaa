import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { Home } from 'lucide-react';

export default function Dashboard({ typesLogements = [], totalMembres = 0 }) {
    const colors = {
        PV: 'bg-green-400',
        PJ: 'bg-yellow-400',
        BM: 'bg-orange-400',
        BR: 'bg-red-400',
        Bloc: 'bg-blue-400',
    };

    return (
        <Layout
            header={
                <h2 className="text-xl font-semibold leading-tight">
                    Tableau de bord - Président
                </h2>
            }
        >
            <Head title="Dashboard Président" />

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {typesLogements.map((type) => (
                    <div
                        key={type.id}
                        className={`card shadow-xl border border-base-300 ${colors[type.type] || 'bg-gray-200'}`}
                    >
                        <div className="card-body flex flex-col items-center text-center">
                            <Home size={40} className="opacity-70 mb-2" />
                            <h2 className="card-title">{type.type}</h2>
                            <p className="text-3xl font-bold">{type.membres_count}</p>
                            <p className="text-sm opacity-60">membres</p>
                        </div>
                    </div>
                ))}

                <div className="col-span-full text-center mt-4">
                    <p className="text-lg font-semibold">
                        Total membres : {totalMembres}
                    </p>
                </div>
            </div>
        </Layout>
    );
}
