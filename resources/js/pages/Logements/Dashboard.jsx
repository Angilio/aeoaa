import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { Home } from 'lucide-react';

export default function Dashboard({ logementsParType = [] }) {

    // Mapping des couleurs selon le type
    const typeColors = {
        PV: 'bg-green-500 text-white',
        PJ: 'bg-yellow-400',
        BM: 'bg-orange-500 text-white',
        BR: 'bg-red-400',
        Bloc: 'bg-blue-500 text-white',
        default: 'bg-base-100 text-base-content' // couleur par défaut
    };

    return (
        <Layout
            header={
                <h2 className="text-xl font-semibold leading-tight">
                    Tableau de bord - Commission Logement
                </h2>
            }
        >
            <Head title="Dashboard Commission" />

            <div className="p-6">

                {/* Grid responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {logementsParType.map((item) => {
                        // Choisir la couleur selon le type
                        const cardClass = typeColors[item.type] || typeColors.default;

                        return (
                            <div
                                key={item.id}
                                className={`card shadow-xl ${cardClass}`}
                            >
                                <div className="card-body flex items-center text-center">
                                    <Home size={40} className="opacity-70 mb-2" />

                                    <h2 className="card-title text-lg">
                                        {item.type}
                                    </h2>

                                    <p className="text-3xl font-bold">
                                        {item.logements_count}
                                    </p>

                                    <p className="text-sm opacity-60">
                                        logements enregistrés
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                    {logementsParType.length === 0 && (
                        <div className="col-span-full text-center opacity-60">
                            Aucun logement enregistré.
                        </div>
                    )}

                </div>
            </div>
        </Layout>
    );
}
